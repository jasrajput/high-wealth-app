import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import { useTheme } from '@react-navigation/native';
import HeaderBar from '../layout/header';
import API from './Components/API';
import { COLORS } from '../constants/theme';


const TeamSection = ({ level, members }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <View style={styles.section}>
        <TouchableOpacity 
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.header}
        >
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>Level {level}</Text>
          </View>
          <Text style={styles.memberCount}>
            {members.length} Members
          </Text>
          <Text style={styles.arrow}>{isExpanded ? '−' : '+'}</Text>
        </TouchableOpacity>
  
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>ID</Text>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Sponsor</Text>
            </View>
            <FlatList
              data={members}
              keyExtractor={item => item.userId}
              renderItem={({ item, index }) => (
                <View style={[styles.row, index % 2 === 0 && styles.alternateRow]}>
                  <Text style={styles.cell}>{item.userId}</Text>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={[styles.cell, styles.sponsorCell]}>{item.realSponsorId}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  };
  
  const Team = () => {
    const [team, setTeam] = useState([]);
  
    useEffect(() => {
      const fetchTeam = async () => {
        const details = await API.getTeamDetails();
        setTeam(details.team);
      }
      fetchTeam();
    }, []);
  
    const groupedTeam = team.reduce((acc, member) => {
      if (!acc[member.level]) acc[member.level] = [];
      acc[member.level].push(member);
      return acc;
    }, {});
  
    return (
      <View style={styles.container}>
        <HeaderBar title="Team" leftIcon={'back'} />
        <View style={styles.content}>
          {Object.keys(groupedTeam).length > 0 ? (
            <FlatList
              data={Object.keys(groupedTeam).sort((a, b) => a - b)}
              keyExtractor={(level) => level}
              renderItem={({ item: level }) => (
                <TeamSection 
                  level={level}
                  members={groupedTeam[level]}
                />
              )}
            />
          ) : (
            <Text style={styles.noTeam}>No team</Text>
          )}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    content: {
      flex: 1,
      padding: 10,
    },
    section: {
      marginBottom: 10,
      borderRadius: 12,
      backgroundColor: '#fff',
      elevation: 2,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderLeftWidth: 4,
      borderLeftColor: '#007AFF',
    },
    levelBadge: {
    //   width: 40,
    //   height: 40,
    //   borderRadius: 20,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
    },
    levelNumber: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    memberCount: {
      flex: 1,
      marginLeft: 15,
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    arrow: {
      fontSize: 24,
      color: '#007AFF',
      width: 30,
      textAlign: 'center',
    },
    expandedContent: {
      margin: 10,
    },
    tableHeader: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
    },
    headerCell: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#666',
    },
    row: {
      flexDirection: 'row',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    alternateRow: {
      backgroundColor: '#fafafa',
    },
    cell: {
      flex: 1,
      fontSize: 14,
      color: '#333',
    },
    sponsorCell: {
      color: '#007AFF',
      fontWeight: '500',
    },
    noTeam: {
      textAlign: 'center',
      marginTop: 15,
      fontSize: 16,
      color: '#666',
    }
  });
  



export default Team;