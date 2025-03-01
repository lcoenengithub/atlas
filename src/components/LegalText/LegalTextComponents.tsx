import styled from '@emotion/styled'
import React from 'react'

import { Text } from '@/components/Text'
import { sizes } from '@/styles'

const _LegalParagraph = styled(Text)`
  margin-top: ${sizes(6)};

  ol + & {
    margin-top: 0;
  }
`

export const LegalParagraph: React.FC<{ header?: boolean }> = ({ header, ...props }) => (
  <_LegalParagraph variant={header ? 'h300' : 't200'} secondary={!header} {...props} />
)
// wrapper so we can use a specific element to render
const _StyledText = styled(Text)`
  /* stylelint-disable-line */
`
export const LegalListItem: React.FC = (props) => <_StyledText variant="t200" secondary as="li" {...props} />

export const LegalLastUpdateText = styled(LegalParagraph)`
  font-style: italic;
`
