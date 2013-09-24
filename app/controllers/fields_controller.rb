include FieldsHelper

class FieldsController < ApplicationController
  before_action :set_field, only: [:show, :edit, :update, :destroy]

  before_filter :store_location
  before_filter :authenticate_user!
  before_filter :admin?, only: [:new, :edit, :update, :destroy]
  
  # GET /fields
  # GET /fields.json
  def index
    @fields = Field.all
    # @json = @fields.to_gmaps4rails

    @json = Field.all.to_gmaps4rails do |field, marker|
      marker.infowindow render_to_string(partial: "/fields/marker", locals: { object: field })
      # marker.picture({
      #                 picture: "http://www.blankdots.com/img/github-32x32.png",
      #                 width:   32,
      #                 height:  32
      #                })
      # marker.title   "i'm the title"
      # marker.sidebar "i'm the sidebar"
      # marker.json({ :id => field.id, :foo => "bar" })
    end
  end

  # GET /fields/1
  # GET /fields/1.json
  def show
    @json = @field.to_gmaps4rails
  end

  # GET /fields/new
  def new
    @field = Field.new
  end

  # GET /fields/1/edit
  def edit
  end

  # POST /fields
  # POST /fields.json
  def create
    @field = Field.new(field_params)

    respond_to do |format|
      if @field.save
        format.html { redirect_to @field, notice: I18n.t(:success, scope: 'custom.controller.notice.create', element: "Field") }
        format.json { render action: 'show', status: :created, location: @field }
      else
        format.html { render action: 'new' }
        format.json { render json: @field.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fields/1
  # PATCH/PUT /fields/1.json
  def update
    respond_to do |format|
      if @field.update(field_params)
        format.html { redirect_to @field, notice: I18n.t(:success, scope: 'custom.controller.notice.update', element: "Field") }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @field.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fields/1
  # DELETE /fields/1.json
  def destroy
    @field.destroy
    respond_to do |format|
      format.html { redirect_to fields_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_field
      @field = Field.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def field_params
      params.require(:field).permit(:street, :city, :country, :latitude, :longitude, :name)
    end

    # Only admins have the right to create, update or destroy fields
    def admin?
      redirect_to fields_url, alert: I18n.t(:alert, scope: 'custom.controller.field.admin') unless current_user.admin?
    end
end
