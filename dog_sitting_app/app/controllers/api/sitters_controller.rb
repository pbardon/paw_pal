module Api

  class SittersController < ApplicationController

    def create
      @sitter = Sitter.new(sitter_params)
      @sitter.user_id = current_user.id
      if @sitter.save!
        render json: @sitter
      else
        render json: @sitter.errors.full_messages
      end
    end

    def update
      @sitter - Siter.fin(params[:id])

      if @sitter.update_attributes(sitter_params)
        render json: @sitter
      else
        render json: @sitter.errors.full_messages
      end
    end

    def show
      @sitter = Sitter.find(params[:id])
      render json: @sitter
    end

    def destroy
      @sitter = Sitter.find(params[:id])
      @sitter.destroy
      render json: @sitter
    end

    private

    def sitter_params
      params.require(:sitter).permit(:sitter_name, :description, :price, :small, :medium, :large, :sitter_photo);
    end

  end

end
