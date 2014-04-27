class Group < ActiveRecord::Base
	attr_accessible :name

  has_many :contracts, dependent: :destroy
  has_many :users, through: :contracts

  validates :name, presence: true,
									 uniqueness: true

  scope :asc, -> attr { order("groups.#{attr} ASC") }
end
