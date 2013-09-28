source 'https://rubygems.org'

ruby "2.0.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails',          '4.0.0.beta1'
gem 'protected_attributes'
gem 'devise',         '3.0.0.rc'
gem 'rails_12factor'
gem 'bootstrap-sass', '2.3.1.0'
gem 'bcrypt-ruby',    '3.0.1'
gem 'will_paginate'
gem 'bootstrap-will_paginate'
gem 'rails-i18n'
gem 'active_attr'
gem 'gmaps4rails'
gem 'bootstrap-datepicker-rails',
	require: 'bootstrap-datepicker-rails',
  git:     'git://github.com/Nerian/bootstrap-datepicker-rails.git'
gem 'google_timezone'

gem 'pg'

# Heroku
group :staging, :production do
	gem 'rails_12factor' # enable features such as static asset serving and logging
	gem 'unicorn' # webserver, as recommended on Cedar
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 4.0.0.beta1'
  gem 'coffee-rails', '~> 4.0.0.beta1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', platforms: :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.0.1'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', group: :development

# To use debugger
# gem 'debugger'
