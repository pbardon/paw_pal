Rails.application.routes.draw do
  resources :users, only: [:create, :new, :update]
  resource :session, only: [:create, :new, :destroy]


  namespace :api, defaults: { format: :json } do
    resources :dogs, only: [:create, :index, :show, :destroy]
  end

  root to: 'static_pages#root'
  
end
