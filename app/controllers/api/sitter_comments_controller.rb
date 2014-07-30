module Api
  class SitterCommentsController  < ApplicationController
    def index
      @sitter_comments = SitterComment.all

      render json: @sitter_comments
    end

    def show
      @sitter_comment = SitterComment.find(params[:id])

      if @sitter_comment
        render json: @sitter_comment
      else
        render json: "record not found"
      end
    end

    def create
      @sitter_comment = SitterComment.new(sitter_comment_params)

      @sitter_comment.user_id = current_user
      time = Time.now
      @sitter_comment.comment_date = "#{time.day}/#{time.month}/#{time.year}"
      if @sitter_comment.save!
        render json: @sitter_comment
      else
        render json: @sitter_comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @sitter_comment = SitterComment.find(params[:id])
      if @sitter_comment && @sitter_comment.user_id == current_user.id
        @sitter_comment.destroy
        render json: @sitter_comment
      else
        render json: "Can't delete comment"
      end
    end

    private

    def sitter_comment_params
      params.require(:sitter_comment).permit(:sitter_id, :comment, :rating)
    end
  end
end
