import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const TEST =
  ' This is a test ';
const Wall_Cabin_Note=
'Patch and repair existing wall surface to like new condition. Repaint to match existing color finish. For brick or stone walls fill holes with matching silicone. Power wash wall if required. Install new signage using existing primary electrical. Verify if additionalcircuits are required for new sign. Field verify dimensions of space shown in photo morph prior to fabrication to verify if specified lettersetwill fit in area and meet clear zone tolerances – refer to Control Documents. ***Change letterset height if required. See control documents for product specification and master agreement for removal & installation requirements';
const Vinyls_Note='"Remove all decals or graphics (i.e. old security decals, old alarm co. decals, credit card decals and FDIC decals),with the exception of addresses, ""push"" or ""pull"", and clean surface of all residue. Field verify dimensions of space shown in photomorph prior to fabrication to verify if specified vinyl graphics will fit in area and meet clear zone tolerances – refer to Control Documents.***Change vinyl graphics sizes if required. See control documents for product specification and master agreement for installation requirements. "';

const Regulatory_Sign='Reuse existing pole. Restore ground material to base of new sign. Verify copy w/ bank prior to fabrication.Fabricator to verify if secondary copy is required on sign face (i.e. legal, towing, city ordinances or code information). See control documents for product specification and master agreement for removal & installation requirements.';

const CONTENT = [
  {
    title: 'Wall Cabinet',
    content: Wall_Cabin_Note,
  },
  {
    title: 'Vinyls',
    content: Vinyls_Note,
  },
  {
    title: 'Regulatory Sign',
    content: Regulatory_Sign,
  },
  {
    title: 'Fourth',
    content: TEST,
  },
  {
    title: 'Fifth',
    content: TEST,
  },
];



export default class App extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Text style={styles.title}>Comet Survey</Text>

          <View style={styles.multipleToggle}>
            {/* <Text style={styles.multipleToggle__title}>Multiple Select?</Text> */}
            {/* <Switch
              value={multipleSelect}
              onValueChange={a => this.setState({ multipleSelect: a })}
            /> */}
          </View>

         

          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Collapsible TEST</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <Text>
                First Test
              </Text>
            </View>
          </Collapsible>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73d7d6',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#f16d0c',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#ff0000',
  },
  active: {
    backgroundColor: 'rgb(255, 255, 200);',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
 

  
  selectTitle: {
    fontSize: 10,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 4,
  },
});
