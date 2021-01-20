import { gql } from '../util/helper'

export const URL = 'https://yourfair-git-s4.madewithyou1.now.sh/graphql'

export const queries = {
  events: gql`
    {
      scanningAppEvents {
        id
        name
        imageTopMobile
        imageBottomMobile
        imageTopTablet
        imageBottomTablet
      }
    }
  `,
  users: gql`
    query($project: ID!) {
      scanningAppUsers(project: $project) {
        id
        language
        name
        profileName
        companyName
        badge {
          project
          registrationId
          days
          sideEvents {
            reference
            date
          }
        }
      }
    }
  `,
}
