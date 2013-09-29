class Match < ActiveRecord::Base
	attr_accessible :jour, :start, :duration, :field_id

  belongs_to :field
  has_many :registres, dependent: :destroy
  has_many :users, through: :registres
  has_many :comments, dependent: :destroy

  before_save :rewrite_start

  HOUR_MIN_1 = /^(([01]?[0-9])|(2[0-3]))\:([0-5][0-9])$/
  HOUR_MIN_2 = /^(([01]?[0-9])|(2[0-3]))([0-5][0-9])$/
  HOUR_MIN_3 = /^([01]?[0-9])|(2[0-3])$/

  validates :jour, presence: true
  validates :start, presence: true
  validates :field_id, presence: true
  validate :check_params

  scope :recent, -> { where("matches.jour >= ?", Date.today) }
  scope :asc,    -> attr { order("matches.#{attr} ASC") }

  def sportizers
    self.users
  end

  private
  	def check_params
  		errors.add(:jour, I18n.t(:later_than_month, scope: 'custom.model.match')) if self.jour > (Date.today+1.month)
      # errors.add(:start, "n'est pas un horaire valide") if (self.start=~HOUR_MIN_1).nil? && (self.start=~HOUR_MIN_2).nil?

      is_valid1 = self.start =~ HOUR_MIN_1
      is_valid2 = self.start =~ HOUR_MIN_2
      is_valid3 = self.start =~ HOUR_MIN_3
      is_invalid = is_valid1.nil? && is_valid2.nil? && is_valid3.nil?
      if is_invalid then
        errors.add(:start, I18n.t(:invalid_time, scope: 'custom.model.match')) 
      else
        if is_valid1 || is_valid2
          m = self.start.match(is_valid1 ? HOUR_MIN_1 : HOUR_MIN_2)
          self.start = "#{m[1]}:#{m[4]}"
        else
          self.start = "#{self.start}:00"
        end
        if self.start.length == 4
          self.start = "0#{self.start}"
        end
        start_dt = match_start(self)
        errors.add(:start, "#{self.start} #{I18n.t(:not_in_past, scope: 'custom.model.match')}") if start_dt < (Time.zone.now-10.seconds)
      end
  	end

    def rewrite_start
      if self.start =~ HOUR_MIN_2 then
        m = start.match(HOUR_MIN_2)
        self.start = "#{m[1]}:#{m[4]}"
      end
    end
end
