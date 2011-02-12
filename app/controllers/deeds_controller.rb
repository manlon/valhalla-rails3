class DeedsController < ApplicationController
  respond_to :html, :json

  before_filter :check_privilege

  PER_PAGE = 20

  def index

    if params[:page] =~ /^-\d+$/
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
    respond_to do |format|
      format.html { render 'layouts/application' }
      format.json { }
    end
  end

  def search
    @deeds = WillPaginate::Collection.new(params[:page] || 1, PER_PAGE)
    if params[:q].blank?
      respond_to do |format|
        format.html { redirect_to deeds_path() }
        format.json { respond_with @deeds }
      end
    else
      @search = true
      # create an empty will-paginate collection  

      # now do the search and stick the results in the will-paginate collection
      search = ActsAsXapian::Search.new(Deed, params[:q], :offset => @deeds.offset, :limit => PER_PAGE)
      @deeds.replace(search.results.select{|r| !r[:model].nil?}.collect{|r| r[:model]})
      @deeds.total_entries = search.matches_estimated
      respond_to do |format|
        format.html { render 'layouts/application' }
        format.json { }
      end
    end
  end

#  def live
#    @live = true
#    @deeds = Deed.order('id desc').limit(PER_PAGE)
#    @deeds = @deeds.reverse
#    # if a nice client tells us we don't need anything, don't send anything
#    if (params[:last])
#      @deeds.reject!{|d| d.id <= params[:last].to_i}
#    end
#  end

  def create
    @deed = Deed.new(params[:deed])
    @deed.save
    respond_with @deed
  end

  def live
    redirect_to deeds_path(:page => live)
  end

end
