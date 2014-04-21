class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :edit, :update, :destroy, :update_user]

  # GET /groups
  # GET /groups.json
  def index
    @groups = current_user.groups.asc("name").paginate(page: params[:page], per_page: 10)
  end

  # GET /groups
  # GET /groups.json
  def find
    @groups = Group.where("name LIKE ?", "%#{group_params[:name]}%").paginate(page: params[:page], per_page: 10)
  end

  # GET /groups/1
  # GET /groups/1.json
  def show
    @users = @group.users.paginate(page: params[:page], per_page: 16)
  end

  # GET /groups/new
  def new
    @group = Group.new
  end

  # GET /groups/type
  def type
    @group = Group.new
  end

  # GET /groups/1/edit
  def edit
  end

  # POST /groups
  # POST /groups.json
  def create
    @group = Group.new(group_params)

    respond_to do |format|
      if @group.save
        @group.users << current_user
        format.html { redirect_to group_url @group, notice: I18n.t(:success, scope: 'custom.controller.notice.create', element: I18n.t(:name, scope: 'custom.controller.group')) }
        format.json { render action: 'show', status: :created, location: @group }
      else
        format.html { render action: 'new' }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /groups/1
  # PATCH/PUT /groups/1.json
  def update
    respond_to do |format|
      if @group.update(group_params)
        message = I18n.t(:success, scope: 'custom.controller.notice.update', element: I18n.t(:name, scope: 'custom.controller.group'))
        format.html { redirect_to user_group_url(current_user, @group), notice: message }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  def update_user
    @group.users.delete(current_user)
    message = I18n.t(:out_group, scope: 'custom.controller.group', name: @group.name)
    respond_to do |format|
      format.html { redirect_to user_groups_url(current_user), notice: message }
      format.json { render action: 'index', status: :updated }
    end
  end

  # DELETE /groups/1
  # DELETE /groups/1.json
  def destroy
    @group.destroy
    respond_to do |format|
      format.html { redirect_to user_groups_url(current_user) }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def group_params
      params.require(:group).permit(:name)
    end
end
