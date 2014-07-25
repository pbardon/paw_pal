module Api

  class SittersController < ApplicationController

    def create
      @sitter = Sitter.new(sitter_params)
      @sitter.user_id = current_user.id
      if @sitter.save!
        render "sitters/show"
      else
        render json: @sitter.errors.full_messages
      end
    end

    def index
      @sitters = Sitter.all
      render "sitters/index"
    end

    def update
      @sitter = Sitter.find(params[:id])

      if @sitter.update_attributes(sitter_params)
        render "sitters/show"
      else
        render json: @sitter.errors.full_messages
      end
    end

    def show
      @sitter = Sitter.find(params[:id])
      render "sitters/show"
    end

    def destroy
      @sitter = Sitter.find(params[:id])
      @sitter.destroy
      render "sitters/show"
    end

    private

    def sitter_params
      params.require(:sitter).permit(:sitter_name, :description, :price, :small, :medium, :large, :sitter_photo);
    end

  end

end
