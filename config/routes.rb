Sportevent::Application.routes.draw do

  get 'home/index'

  scope "(:locale)", locale: /en|fr/ do

    resources :matches, except: [:index_user] do
      resources :comments, only: [:new, :create, :destroy]
    end
    resources :fields
    
    devise_for :users, controllers: { registrations: 'users/registrations', confirmations: 'users/confirmations' }
    devise_scope :user do
      put '/confirm' => 'users/confirmations#confirm'
    end

    resources :users, except: [:new, :create] do
      # resources :some_resource shallow: true => only: [:index, :new, :create]
      resources :groups, except: [:show, :update, :destroy, :type, :find]

      resources :matches, only: [:index_user]
      get 'matches' => 'matches#index_user'
    end

    get 'groups/find' => 'groups#find'
    resources :groups, only: [:show, :update, :destroy, :type, :find]
    
    # You can have the root of your site routed with "root"
    root to: 'home#index'
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'
  get '/help' => 'home#help'

  match '/contact' => 'contact#new',    :as => 'contact', :via => :get
  match '/contact' => 'contact#create', :as => 'contact', :via => :post
  match '/contact' => 'contact#update', :as => 'contact', :via => :put

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
