class UsersController < ApplicationController
  before_action :set_user,           only: [:show, :edit, :update, :destroy]

  before_filter :store_location
  before_filter :authenticate_user!
  before_filter :correct_user?,      only: [:edit, :update]
  before_filter :admin?,             only: [:destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.where(confirmation_token: nil).asc("prenom").asc("nom").paginate(page: params[:page], per_page: 5)

    respond_to do |format|
      format.html { @users }
      format.json {
        render json: {
          current_page:  @users.current_page,
          per_page:      @users.per_page,
          total_entries: @users.total_entries,
          entries:       @users
        }
      }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        # sign_in @user
        format.html { redirect_to @user, notice: I18n.t(:success, scope: 'custom.controller.notice.create', element: "User") }
        format.json { render action: 'show', status: :created, location: @user }
      else
        format.html { render action: 'new' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: I18n.t(:success, scope: 'custom.controller.notice.update', element: "User") }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:nom, :prenom, :email, :password, :password_confirmation)
    end

    def correct_user?
      redirect_to root_url unless current_user == @user
    end

    def admin?
      redirect_to root_url unless current_user.admin?
    end
end
