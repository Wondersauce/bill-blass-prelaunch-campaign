require 'csv'

namespace :prelaunchr do
    desc "Will out put CSV's for each group of users you should email"
    task :create_winner_csvs => :environment do
        stops = (1..20).each

        winners = Hash.new {|h,k| h[k]=[]}
        User.all.each { |user|
            found = 0

            stops.reverse_each { |stop|
                if stop <= user.referrals.count and !found
                    found = stop
                end
            }

            winners[found] << user
        }

        winners.each { |stop, list|
            CSV.open("#{Rails.root}/lib/assets/group_#{stop}.csv", "wb") do |csv|
                list.each { |user|
                    csv << [user.email, user.referrals.count, user.referrals.map { |user| user.email } .join("; ") ]
                }
            end
        }
    end
end
