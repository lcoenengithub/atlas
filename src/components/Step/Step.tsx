import React, { forwardRef, useEffect, useState } from 'react'

import { CircularProgress } from '@/components/CircularProgress'
import { SvgActionCheck, SvgActionLock, SvgActionTrash } from '@/components/_icons'

import {
  Overhead,
  ProgressContainer,
  StepDetails,
  StepNumber,
  StepStatus,
  StepTitle,
  StepType,
  StepVariant,
  StepWrapper,
} from './Step.styles'

import { Text } from '../Text'
import { IconButton } from '../_buttons/IconButton'

export type StepProps = {
  title: string
  variant?: StepVariant
  type?: StepType
  isLoading?: boolean
  disabled?: boolean
  number?: number
  onDelete?: () => void
  className?: string
}

export const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ type = 'default', isLoading, disabled, title, number, onDelete, className, variant = 'current' }, ref) => {
    const [circularProgress, setCircularProgress] = useState(0)

    useEffect(() => {
      if (!isLoading) {
        setCircularProgress(0)
        return
      }
      const timeout = setTimeout(() => {
        setCircularProgress(circularProgress + 20)
      }, 50)

      return () => clearTimeout(timeout)
    }, [circularProgress, isLoading])

    return (
      <StepWrapper aria-disabled={disabled} stepVariant={variant} stepType={type} ref={ref} className={className}>
        <StepStatus>
          {isLoading ? (
            <ProgressContainer>
              <CircularProgress value={circularProgress} maxValue={100} />
            </ProgressContainer>
          ) : (
            <StepNumber stepVariant={variant}>
              {variant === 'completed' || disabled ? <SvgActionCheck /> : <Text variant="t200">{number}</Text>}
            </StepNumber>
          )}
          <StepDetails>
            <Overhead variant="t100" secondary>
              Step {number}
            </Overhead>
            <StepTitle variant="t100-strong" secondary={variant !== 'current'}>
              {title}
            </StepTitle>
          </StepDetails>
        </StepStatus>
        {((onDelete && variant === 'completed' && !isLoading) || disabled) && (
          <IconButton variant="tertiary" disabled={disabled} onClick={() => !disabled && onDelete?.()}>
            {disabled ? <SvgActionLock /> : <SvgActionTrash />}
          </IconButton>
        )}
      </StepWrapper>
    )
  }
)
Step.displayName = 'Step'
