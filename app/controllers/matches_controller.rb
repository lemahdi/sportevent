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
        format.html { redirect_to @match, notice: 'Match was successfully created.' }
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
      message = "Félicitations, vous faites partie des joueurs"
    else
      @match.sportizers.delete(current_user)
      message = "Vous avez quitté le match"
    end

    respond_to do |format|
      # if @match.update(match_params)
      #   format.html { redirect_to @match, notice: message }
      #   format.json { head :no_content }
      # else
      #   format.html { render action: 'edit' }
      #   format.json { render json: @match.errors, status: :unprocessable_entity }
      # end
      format.html { redirect_to matches_url, notice: message }
      format.json { render action: 'index', status: :updated, location: matches_url }
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

    # Verify that the current user is subscribed to the match he tries to show
    # def subscribed_to_match
      # unless subscribed?(@match)
      #   message = "Vous n'êtes pas inscrit(e) à cette réservation"
      #   respond_to do |format|
      #     format.html { redirect_to matchs_url, alert: message }
      #     format.json { render 'show', status: :unauthorized, alert: message }
      #   end
      # end
    # end
end
