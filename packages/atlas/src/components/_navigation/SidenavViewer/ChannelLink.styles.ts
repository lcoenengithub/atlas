import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { Avatar } from '@/components/Avatar'
import { sizes } from '@/styles'

type ContainerProps = {
  disabled?: boolean
}

export const Container = styled(Link)<ContainerProps>`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

type AvatarProps = {
  withHandle: boolean
}

export const StyledAvatar = styled(Avatar)<AvatarProps>`
  margin-right: ${({ withHandle }) => (withHandle ? sizes(4) : 0)};
`
