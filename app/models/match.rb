class Match < ActiveRecord::Base
	attr_accessible :start, :duration, :field_id

  belongs_to :field

  validates :start, presence: true
  validates :field_id, presence: true
  validate :should_start_within_month

  scope :recent, -> { where("matches.start >= ?", Date.today) }
  scope :asc,    -> attr { order("matches.#{attr} ASC") }

  private
  	def should_start_within_month
  		errors.add(:jour, "ne peut pas être au delà d'une semaine") if self.start > (Date.today+1.month)
  	end
end
