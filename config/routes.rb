Rails.application.routes.draw do
    resources :users, only: [:create, :new, :update]
    resource :session, only: [:create, :new, :destroy]


    namespace :api, defaults: { format: :json } do
        resources :dogs, only: [:create, :index, :update, :show, :destroy]
        resources :shelters, only: [:create, :index, :update, :show, :destroy]
        resources :comments, only: [:index, :create, :show, :update, :destroy]
    end


    get '/login', to: 'static_pages#home'

    get '/static_pages/home', to: 'static_pages#home'

    get '/templates/:timestamp/:path.html' => 'templates#page'

    get 'session/guest', to: 'sessions#guest', as: 'guest'

    get '/', to: 'static_pages#home'

    get '*path', to: 'static_pages#home'

end
