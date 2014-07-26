Rails.application.routes.draw do
  resources :users, only: [:create, :new, :update]
  resource :session, only: [:create, :new, :destroy]


  namespace :api, defaults: { format: :json } do
    resources :dogs, only: [:create, :index, :update, :show, :destroy]
    resources :sitters, only: [:create, :index, :update, :show, :destroy]
  end

  root to: 'static_pages#root'

end