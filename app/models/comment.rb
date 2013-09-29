class Comment < ActiveRecord::Base
	attr_accessible :body, :user_id, :match_id

  belongs_to :user
  belongs_to :match
end
