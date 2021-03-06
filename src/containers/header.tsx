import * as React from 'react'
import { PureComponent } from 'react'
import { connect, MapStateToProps, Dispatch } from 'react-redux'
import { AppState } from '../redux/store'
import { WaterChatAction } from '../events/actions'
import { SESSION_ID_CHANGED } from '../events/actionIds'
import glamorous from 'glamorous'
import { green, darkBlue, lightBlue } from '../colors'
import { GradienButton } from '../components/generic'

const HeaderContainer = glamorous.div({
  backgroundColor: darkBlue,
  height: '100px',
  minHeight: '100px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const SvgContain = glamorous.div({
  textAlign: 'center',
  width: '215px',
  height: '100%',
  fontFamily: "'Lobster', cursive",
  marginLeft: '20px',
})

const Title = ({ text }: { text: string }) =>
  <SvgContain>
    <svg width="100%" height="100%" fill="url(#Gradient-1)">
      <defs>
        <linearGradient
          x1="0%"
          y1="0%"
          id="Gradient-1"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={green} />
          <stop offset="100%" stopColor={lightBlue} />
        </linearGradient>
      </defs>
      <text x="0%" y="60px" fontSize="40px">{text}</text>
    </svg>
  </SvgContain>

function mapDispatch(dispatch: Dispatch<WaterChatAction>) {
  return {
    logOut: () => {
      dispatch({
        type: SESSION_ID_CHANGED,
        sessionId: '',
      })
    },
  }
}

const mapState: MapStateToProps<HeaderProps, {}> = (
  state: AppState,
  ownProps
) => ({
  connected: state.chatSocket !== null,
})

type DispatchProps = {
  logOut: () => void
}

type HeaderProps = {
  connected: boolean
}

const LogOutButton = glamorous(GradienButton)({
  margin: '10px',
  alignSelf: 'flex-start',
  background: 'transparent',
  color: lightBlue,
  ':hover': {
    textDecoration: 'underline',
  },
})

const RightContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const GitHubButton = glamorous((props: React.HTMLProps<HTMLDivElement>) =>
  <div {...props}>
    <a
      className="github-button"
      href="https://github.com/kaoDev/waterchat-app"
      data-size="small"
      aria-label="Star kaoDev/waterchat-app on GitHub"
    />
  </div>
)({
  margin: '10px',
})

class HeaderComponent extends PureComponent<HeaderProps & DispatchProps, {}> {
  render() {
    const { connected, logOut } = this.props

    const logOutButton = connected
      ? <LogOutButton onClick={logOut}>Logout</LogOutButton>
      : null

    return (
      <HeaderContainer>
        <Title text={'Waterchat'} />
        <RightContainer>
          <GitHubButton />
          {logOutButton}
        </RightContainer>
      </HeaderContainer>
    )
  }
}
export const Header = connect(mapState, mapDispatch)(HeaderComponent)
