Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resource :weather, only: [:show]
    resource :geocode, only: [:show]
    resources :searches, only: [:index, :create]
  end
end
