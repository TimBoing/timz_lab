Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/visit_card', to: 'pages#visit_card'
  get '/loaders', to: 'pages#loaders'
  get '/fonts', to: 'pages#fonts'
  get '/themes', to: 'pages#themes'

end
