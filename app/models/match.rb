class Match < ActiveRecord::Base
	attr_accessible :jour, :start, :duration, :field_id

  belongs_to :field

  validates :jour, presence: true
  validates :start, presence: true
  validates :field_id, presence: true
  validate :check_params

  scope :recent, -> { where("matches.jour >= ?", Date.today) }
  scope :asc,    -> attr { order("matches.#{attr} ASC") }

  private
  	def check_params
  		errors.add(:jour, "ne peut pas être au delà d'un mois") if self.jour > (Date.today+1.month)
      errors.add(:start, "#{self.start} ne peut pas être dans le passé") if self.start < (Time.zone.now-10.seconds)
  	end
end
