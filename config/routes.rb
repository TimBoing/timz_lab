Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/visit_card', to: 'pages#visit_card'
  get '/loaders', to: 'pages#loaders'
  get '/fonts', to: 'pages#fonts'
  get '/themes', to: 'pages#themes'
  get '/oeil', to: 'pages#oeil'
  get '/max', to: 'pages#max'
  get '/three', to: 'pages#three'
  get '/three_sandbox', to: 'pages#three_sandbox'
  get '/fractal_tree', to: 'pages#fractal_tree'
  get '/clean_three', to: 'pages#clean_three'
  get '/bn', to: 'pages#bn'
  get '/demonge', to: 'pages#demonge'
  get '/smoke', to: 'pages#smoke'

end
