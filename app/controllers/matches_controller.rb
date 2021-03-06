include MatchesHelper

class MatchesController < ApplicationController
  before_action :set_match,          only:   [:show, :update, :destroy]
  
  before_filter :store_location
  before_filter :authenticate_user!, except: [:index, :show]

  # GET /matches
  # GET /matches.json
  def index
    @match = Match.new

    is_jour = !params[:match].nil? && !match_params[:jour].nil? && !match_params[:jour].empty?
    is_field = !params[:match].nil? && !match_params[:field_id].nil?
    if !is_jour && !is_field
      @matches = Match.recent.asc("start").asc("jour").paginate(page: params[:page], per_page: 30)
    else
      if is_jour && is_field
        db_date = DateTime.strptime(match_params[:jour], "%d/%m/%Y").strftime("%m/%d/%Y")
        @matches = Match.where("jour = ? AND field_id IN (SELECT id FROM fields WHERE name ~* ?)", db_date, ".*#{match_params[:field_id]}.*").recent.paginate(page: params[:page], per_page: 30)
      elsif is_jour
        db_date = DateTime.strptime(match_params[:jour], "%d/%m/%Y").strftime("%m/%d/%Y")
        @matches = Match.where("jour = ?", db_date).recent.paginate(page: params[:page], per_page: 30)
      elsif is_field
        @matches = Match.where("field_id IN (SELECT id FROM fields WHERE name ~* ?)", ".*#{match_params[:field_id]}.*").recent.paginate(page: params[:page], per_page: 30)
      end
    end

    respond_to do |format|
      format.html { @matches }
      format.json {
        render json: {
          current_page:  @matches.current_page,
          per_page:      @matches.per_page,
          total_entries: @matches.total_entries,
          entries:       @matches
        }
      }
    end
  end

  # GET /matches
  # GET /matches.json
  def index_user
    @matches = current_user.matches
                        .recent.asc("start").asc("jour")
                        .paginate(page: params[:page], per_page: 10)

    respond_to do |format|
      format.html { @matches }
      format.json {
        render json: {
          current_page:  @matches.current_page,
          per_page:      @matches.per_page,
          total_entries: @matches.total_entries,
          entries:       @matches
        }
      }
    end
  end

  # GET /matches/1
  # GET /matches/1.json
  def show
  end

  # GET /matches/new
  def new
    @match = Match.new
  end

  # GET /matches/1/edit
  def edit
  end

  # POST /matches
  # POST /matches.json
  def create
    @match = Match.new(match_params)

    respond_to do |format|
      if @match.save
        @match.sportizers << current_user
        format.html { redirect_to @match, notice: I18n.t(:success, scope: 'custom.controller.notice.create', element: "Match") }
        format.json { render action: 'show', status: :created, location: @match }
      else
        format.html { render action: 'new' }
        format.json { render json: @match.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /matches/1
  # PATCH/PUT /matches/1.json
  def update
    up_action = match_params[:update_action]
    if up_action=="leave" || up_action=="join"
      if up_action == "leave"
        @match.sportizers.delete(current_user)
        message = I18n.t(:out_game, scope: 'custom.controller.match')
        respond_to do |format|
          format.html { redirect_to match_params[:from]=="index" ? matches_url : user_matches_url(current_user), notice: message }
          format.json { render action: 'index', status: :updated }
        end
      else # join
        @match.sportizers << current_user
        message = I18n.t(:in_game, scope: 'custom.controller.match')
        respond_to do |format|
          format.html { redirect_to @match, notice: message }
          format.json { render action: 'show', status: :updated, location: @match }
        end
      end
    else
      respond_to do |format|
        if @match.update(match_params)
          message = I18n.t(:success, scope: 'custom.controller.notice.update', element: I18n.t(:name, scope: 'custom.controller.match'))
          format.html { redirect_to @match, notice: message }
        format.json { render action: 'index', status: :updated }
        else
          format.html { render action: 'edit' }
          format.json { render json: @match.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /matches/1
  # DELETE /matches/1.json
  def destroy
    @match.destroy
    respond_to do |format|
      format.html { redirect_to match_params[:from]=="index" ? matches_url : user_matches_url(current_user) }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_match
      @match = Match.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def match_params
      params.require(:match).permit(:jour, :start, :duration, :field_id, :update_action, :from)
    end
end
