namespace :bdt do # bdt: before deploy tasks

	desc "Clean public assets"
	task :clean do
		sh "git rm -rf public/assets/"
	end

	desc "Precompiling assets before deployment"
	task precompile: :clean do
		Sportevent::Application.load_local_env()
		sh "rake assets:precompile RAILS_ENV=$RAILS_ENV"
		sh "git add ."
		sh "git commit -a -m'precompiling assets for $RAILS_ENV'"
	end

end