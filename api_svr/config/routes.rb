Rails.application.routes.draw do
  
  resources :franchises
  resources :geolayers
  resources :users, param: :_username
  post '/auth/login',to: 'authentication#login'
  get '/*a', to: 'application#not_found'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
