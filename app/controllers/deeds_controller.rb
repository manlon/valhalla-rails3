class DeedsController < ApplicationController
  respond_to :html, :json

  def index
    per_page = 20
    if params[:page] == 'live'
      @live = true
      @deeds = Deed.order('id desc').limit(per_page)
      @deeds = @deeds.reverse
      # if a nice client tells us we don't need anything, don't send anything
      @deeds = [] if @deeds.last.id.to_s == params[:last]
    elsif params[:page] =~ /^-\d+/
      offset = Integer(params[:page]) + 1
      p = Deed.paginate(:page => 1, :per_page => per_page)
      @deeds = Deed.paginate(:page => p.total_pages + offset, :per_page => per_page)
    else
      @deeds = Deed.paginate(:page => params[:page] || 1, :per_page => per_page)
    end
    respond_with @deeds
  end

  def search
    if params[:q].blank?
      redirect_to deeds_path()
    else
      per_page = 20
      # create an empty will-paginate collection first to have it do the
      # pagination math 
      @deeds = WillPaginate::Collection.new(params[:page] || 1, per_page)

      # now do the search and stick the results in the will-paginate collection
      search = ActsAsXapian::Search.new(Deed, params[:q], :offset => @deeds.offset, :limit => per_page)
      @deeds.total_entries = search.matches_estimated
      @deeds.replace(search.results.collect{|r| r[:model]})
      render 'index'
    end
  end

  def create
    @deed = Deed.new(deed_params)
    @deed.save
    respond_with @deed
  end

  def live
    redirect_to deeds_path(:page => live)
  end

  def deed_params
    if deed = params[:deed]
      deed
    elsif json = params[:_json]
      if json.size == 1
        json = json.first
        if json['model'] == 'valhalla.deed' && fields = json['fields']
          {:speaker => fields['speaker'], :performed_at => fields['deed_date'], :text => fields['text']}
        end
      end
    end
  end
  private :deed_params

end
