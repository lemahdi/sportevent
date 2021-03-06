class ContactController < ApplicationController
  before_filter :authenticate_user!, only: :update

  def new
  	@contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)

    respond_to do |format|
      if @contact.valid?
        UserMailer.contact_email(@contact).deliver
        format.html { redirect_to root_url, notice: I18n.t(:msg_sent, scope: 'custom.controller.notice') }
        format.json { head :no_content, status: :success, location: root_url }
      else
        format.html { render action: 'new' }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    match = Match.find_by_id(contact_params[:match_id])
    if !match.users.include?(current_user)
      respond_to do |format|
        format.html { redirect_to matches_path, notice: I18n.t(:alert_match, scope: 'custom.controller.contact.member') and return }
        format.json { render action: 'index', status: :updated, location: match and return }
     end
    end

    group = Group.find_by_id(contact_params[:group_id])
    if !group.users.include?(current_user)
      respond_to do |format|
        format.html { redirect_to matches_path, notice: I18n.t(:alert_group, scope: 'custom.controller.contact.member') and return }
        format.json { render action: 'index', status: :updated, location: match and return }
     end
    end

    @contact = Contact.new
    @contact.build(current_user, I18n.t(:invite_subject, scope: 'custom.controller.contact'), contact_params[:content])
    destination = contact_params[:destination]

    unless @contact.content.blank?
      group.users.each do |u|
        UserMailer.invite_play_match(@contact, match, u).deliver unless match.users.include?(u)
      end

      respond_to do |format|
        format.html { redirect_to match_path(match), notice: I18n.t(:msg_sent, scope: 'custom.controller.notice') }
        format.json { render action: 'show', status: :updated, location: match }
     end
    else
      respond_to do |format|
        format.html { redirect_to reservation_path(reservation), alert: I18n.t(:msg_blank, scope: 'custom.controller.alert') }
        format.json { render action: 'show', status: :unprocessable_entity, alert: I18n.t(:msg_blank, scope: 'custom.controller.alert'), location: reservation }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      params.require(:contact).permit(:nom, :email, :subject, :content, :destination, :match_id, :group_id)
    end
end
