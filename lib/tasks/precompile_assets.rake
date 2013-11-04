namespace :bdt do # bdt: before deploy tasks

	desc "Clean public assets"
	task :clean do
		sh "rm -rf public/assets/"
	end

	desc "Precompiling assets before deployment"
	task precompile: :clean do
		Sportevent::Application.load_local_env()
		sh "rake assets:precompile RAILS_ENV=$RAILS_ENV"
	end

end