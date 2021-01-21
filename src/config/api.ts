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
  scanUser: gql`
    mutation($input: ScanUserOnEventInput!) {
      scanUserOnEvent(input: $input) {
        registrationId
        days
        sideEvents {
          reference
          date
        }
      }
    }
  `,
}

export const query = async (query: string, variables?: any) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error('Request failed')
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error('Response error')
  }

  return json
}
