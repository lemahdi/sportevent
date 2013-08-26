include MatchesHelper

class MatchesController < ApplicationController
  before_action :set_match,         only: [:show, :update, :destroy]
  
  before_filter :store_location
  before_filter :authenticate_user!
  before_filter :parse_start,       only: [:create]

  # GET /matches
  # GET /matches.json
  def index
    @matches = Match.recent.asc("jour").paginate(page: params[:page], per_page: 30)
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
    respond_to do |format|
      if @match.update(match_params)
        format.html { redirect_to @match, notice: 'Match was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @match.errors, status: :unprocessable_entity }
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

    # Some helpful parameters
    def help_params
      params.require(:match).permit(:start_str, :utc_offset)
    end

    # Parse start time
    def parse_start
      re1 = /^(([01]?[0-9])|(2[0-3]))\:([0-5][0-9])$/
      re2 = /^(([01]?[0-9])|(2[0-3]))([0-5][0-9])$/

      start_str = help_params[:start_str]

      is_valid1 = start_str =~ re1
      is_valid2 = start_str =~ re2
      is_invalid = is_valid1.nil? && is_valid2.nil?
      
      if is_invalid then
        message = "L'horaire n'est pas valide"
        respond_to do |format|
          format.html { redirect_to new_match_url(@match), alert: message }
          format.json { render 'new', status: :unauthorized, alert: message }
        end
      else
        if is_valid1 then
          m = start_str.match(re1)
        elsif is_valid2
          m = start_str.match(re2)
        end

        jour = params[:match][:jour].split("-")
        params[:match][:start] = DateTime.new(jour[2].to_i, jour[1].to_i, jour[0].to_i,
                                            m[1].to_i, m[4].to_i, 0,
                                            help_params[:utc_offset]).utc
      end
    end

    # Verify that the current user is subscribed to the reservation he tries to show
    # def subscribed_to_match
      # unless subscribed?(@reservation)
      #   message = "Vous n'êtes pas inscrit(e) à cette réservation"
      #   respond_to do |format|
      #     format.html { redirect_to reservations_url, alert: message }
      #     format.json { render 'show', status: :unauthorized, alert: message }
      #   end
      # end
    # end
end
