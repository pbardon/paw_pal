module Api
    class DogsController < ApplicationController
        wrap_parameters :dog, include: [:name, :age, :description, :size, :dog_photo]

        def create
            @dog = current_user.dogs.new(dog_params)

            if @dog.save
              render 'dogs/show'
            else
              render json: @dog.errors.full_messages, status: :unprocessable_entity
            end
        end

        def all
            @dogs = Dog.all
            render 'dogs/index'
        end

        def index
            if params[:search] == 'all'
                @dogs = Dog.all
            else
                @dogs = current_user.dogs
            end
            render 'dogs/index'
        end

        def show
            @dog = Dog.find(params[:id])
            if @dog
                render 'dogs/show'
            else
                render json: @dog.errors.full_messages, status: :not_found
            end
        end

        def update
            @dog = Dog.find(params[:id])
            if @dog.owner_id == current_user.id && @dog.update_attributes(dog_params)
                render 'dogs/show'
            else
                render json: @dog.errors.full_messages, status: :unprocessable_entity
            end
        end

        def destroy
            @dog = Dog.find(params[:id])
            @dog.destroy
            render 'dogs/show'
        end

        private

        def dog_params
            params.require(:dog).permit(:name, :age, :description, :size, :dog_photo)
        end

    end
end
