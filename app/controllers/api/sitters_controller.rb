require 'addressable/uri'
require 'rest-client'
require 'nokogiri'
require 'json'

module Api

  class SittersController < ApplicationController
    attr_reader :user_id

    wrap_parameters :sitter, include: [:sitter_name, :price, :description, :street_address,
                                       :city, :state, :zipcode, :small, :medium, :large, :sitter_photo]


    def create
      @sitter = Sitter.new(sitter_params)
      @sitter.user_id = current_user.id
      if @sitter.save
        geo = generate_geocode(@sitter.street_address, @sitter.zipcode, @sitter.city, @sitter.state)
        @sitter.latitude = geo[0]
        @sitter.longitude = geo[1]
        @sitter.save!
        render 'sitters/show'
      else
        render json: @sitter.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @sitters = Sitter.all
      render "sitters/index"
    end

    def update
      @sitter = Sitter.find(params[:id])

      if @sitter.user_id == current_user.id && @sitter.update_attributes(sitter_params)
        geo = generate_geocode(@sitter.street_address, @sitter.zipcode, @sitter.city, @sitter.state)
        @sitter.latitude = geo[0]
        @sitter.longitude = geo[1]
        @sitter.save!
        render "sitters/show"
      else
        render json: @sitter.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @sitter = Sitter.find(params[:id])
      @current_user = current_user
      render "sitters/show"
    end

    def destroy
      @sitter = Sitter.find(params[:id])
      if @sitter.user_id == current_user.id && @sitter.destroy
        render "sitters/show"
      else
        render json: "Can't destroy some else's sitter profile"
      end
    end

    private

    def sitter_params
      params.require(:sitter).permit(:sitter_name, :description, :price,
                                     :small, :medium, :large,
                                     :street_address, :city, :state, :zipcode, :sitter_photo)
    end

    def generate_geocode(street_address, zipcode, city, state)
      coords = []
      address = street_address.to_s + ", " + city.to_s + ", " + state.to_s + " " + zipcode.to_s

      geolocationaddress = Addressable::URI.new(
        scheme: 'http',
        host: 'maps.googleapis.com',
        path: 'maps/api/geocode/json',
        query_values: {address: address}
      ).to_s

      output = JSON.parse(RestClient.get(geolocationaddress))
      results = output["results"].first
      location = results['geometry']['location']

      coords.push(location['lat'])
      coords.push(location['lng'])
      coords
    end

  end

end
