namespace :bdt do # bdt: before deploy tasks

	desc "Clean public assets"
	task :clean do
		sh "rake assets:clean RAILS_ENV=#{ENV['RAILS_ENV']} RAILS_GROUPS=assets"
	end

	desc "Precompiling assets before deployment"
	task precompile: :clean do
		Sportevent::Application.load_local_env()
		sh "rake assets:precompile RAILS_ENV=#{ENV['RAILS_ENV']} RAILS_GROUPS=assets"
	end

end