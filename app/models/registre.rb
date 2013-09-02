class Registre < ActiveRecord::Base
  belongs_to :user
  belongs_to :match

  validates_uniqueness_of :user_id, scope: :match_id
end
