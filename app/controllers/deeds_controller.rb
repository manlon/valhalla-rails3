class DeedsController < ApplicationController
  respond_to :html, :json

  before_filter :check_privilege

  PER_PAGE = 20

  def index
    if params[:page] == 'live'
      @live = true
      @deeds = Deed.order('id desc').limit(PER_PAGE)
      @deeds = @deeds.reverse
      # if a nice client tells us we don't need anything, don't send anything
      if (params[:last])
        @deeds.reject!{|d| d.id <= params[:last].to_i}
      end
    elsif params[:page] =~ /^-\d+$/
      offset = Integer(params[:page]) + 1
      p = Deed.paginate(:page => 1, :per_page => PER_PAGE)
      @deeds = Deed.paginate(:page => p.total_pages + offset, :per_page => PER_PAGE)
    elsif params[:context] =~ /^\d+$/
      page = (Deed.count(:conditions => ['id < ?', params[:context]]) / PER_PAGE) + 1
      @deeds = Deed.paginate(:page => page, :per_page => PER_PAGE)
      @context = params[:context]
    else
      @deeds = Deed.paginate(:page => params[:page] || 1, :per_page => PER_PAGE)
    end
    respond_with @deeds
  end

  def search
    if params[:q].blank?
      redirect_to deeds_path()
    else
      @search = true
      # create an empty will-paginate collection first to have it do the
      # pagination math 
      @deeds = WillPaginate::Collection.new(params[:page] || 1, PER_PAGE)

      # now do the search and stick the results in the will-paginate collection
      search = ActsAsXapian::Search.new(Deed, params[:q], :offset => @deeds.offset, :limit => PER_PAGE)
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
