# == Schema Information
#
# Table name: searches
#
#  id         :integer          not null, primary key
#  long       :string           not null
#  lat        :string           not null
#  location   :text             not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date       :string
#

class Search < ApplicationRecord
  validates :long, :lat, :location, :user, presence: true
  belongs_to :user
end
