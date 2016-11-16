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
                page_num = 1
                if params[:page]
                    page_num = params[:page]
                end
                @dogs = Dog.page(page_num).per(12)
            elsif current_user
                @dogs = current_user.dogs
            elsif !current_user
                render json: 'user is not logged in',  status: :bad_request
                return
            else
                render json: 'search parameters not included', status: :bad_request
                return
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
