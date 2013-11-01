include MatchesHelper

class MatchesController < ApplicationController
  before_action :set_match,         only: [:show, :update, :destroy]
  
  before_filter :store_location
  before_filter :authenticate_user!

  # GET /matches
  # GET /matches.json
  def index
    @matches = Match.recent.asc("jour").asc("start").paginate(page: params[:page], per_page: 30)

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
    if params[:participate] == "yes"
      @match.sportizers << current_user
      message = I18n.t(:in_game, scope: 'custom.controller.match.update')
      respond_to do |format|
        format.html { redirect_to @match, notice: message }
        format.json { render action: 'show', status: :updated, location: @match }
      end
    else
      @match.sportizers.delete(current_user)
      message = I18n.t(:out_game, scope: 'custom.controller.match.update')
      respond_to do |format|
        format.html { redirect_to matches_url, notice: message }
        format.json { render action: 'index', status: :updated }
      end
    end
  end

  # DELETE /matches/1
  # DELETE /matches/1.json
  def destroy
    @match.destroy
    respond_to do |format|
      format.html { redirect_to matches_url }
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
      params.require(:match).permit(:jour, :start, :duration, :field_id)
    end
end
