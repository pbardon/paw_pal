module Api

  class SittersController < ApplicationController
    attr_reader :your_profile


    def create
      @sitter = Sitter.new(sitter_params)
      @sitter.user_id = current_user.id
      if @sitter.save!
        geo = generate_geocode(@sitter.street_address, @sitter.zipcode, @sitter.city, @sitter.state)
        @sitter.latitude = geo[0]
        @sitter.longitude = geo[1]
        @sitter.save
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
      # if @sitter.id == current_user.id
      render "sitters/show"
    end

    def destroy
      @sitter = Sitter.find(params[:id])
      if @sitter.id == current_user.id
        @sitter.destroy
        render "sitters/show"
      else
        render json: "Can't destroy some else's sitter profile"
      end
    end

    private

    def sitter_params
      params.require(:sitter).permit(:sitter_name, :description, :price, :small, :medium, :large, :sitter_photo);
    end

    def generate_geocode(street_address, zipcode, city, state)
      

    end

  end

end
