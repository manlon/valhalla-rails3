ValhallaRails3::Application.routes.draw do |map|
  match 'deeds/live', :to => redirect('/deeds?page=live')
  resources :deeds do
    collection do
      get :search
    end
  end
end
