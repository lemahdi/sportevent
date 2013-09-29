include CommentsHelper

class CommentsController < ApplicationController
  before_action :set_match

  before_filter :authenticate_user!
  before_filter :blank?
  before_filter :playing?

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = @match.comments.create(body: comment_params[:body], user_id: current_user.id)
    redirect_to match_path(@match)
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
end
