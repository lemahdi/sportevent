class Group < ActiveRecord::Base
	attr_accessible :name

  has_many :contracts, dependent: :destroy
  has_many :users, through: :contracts

  validates :jour, presence: true
end
