include CommentsHelper

class CommentsController < ApplicationController
  before_action :set_match

  before_filter :authenticate_user!
  before_filter :blank?,   except: :destroy
  before_filter :playing?, except: :destroy
  before_filter :admin?,   only:   :destroy

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = @match.comments.create(body: comment_params[:body], user_id: current_user.id)
    contact = Contact.new
    subject = I18n.t(:subject, scope: 'custom.controller.comment', nom: "#{current_user.nom} #{current_user.prenom}")
    contact.build(current_user, subject, @comment)
    @match.users.each do |u|
      UserMailer.notify_match_comment(contact, @match, u).deliver if u.id != current_user.id
    end
    redirect_to match_path(@match), notice: I18n.t(:added, scope: 'custom.controller.comment')
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment = @match.comments.find(params[:id])
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to match_url(@match) }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_match
      @match = Match.find(params[:match_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:body)
    end

    # Body should not be blank
    def blank?
      redirect_to matche_url(@match), alert: I18n.t(:alert, scope: 'custom.controller.comment.blank') if comment_params[:body].blank?
    end

    # Only admins have the right to create, update or destroy fields
    def playing?
      redirect_to matche_url(@match), alert: I18n.t(:alert, scope: 'custom.controller.comment.playing') unless playing_user?(@match, current_user)
    end

    def admin?
      redirect_to match_url(@match), alert: I18n.t(:alert, scope: 'custom.controller.comment.admin') unless current_user.admin?
    end
end
