import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from './components/Home'
import Detail from './components/Detail'
import Add from './components/Add'

const screens = {
    Home: {
        screen: Home
    },
    Detail : {
        screen: Detail
    },
    Add : {
        screen:Add
    }
}
const HomeStack = createStackNavigator(screens)
export default createAppContainer(HomeStack)