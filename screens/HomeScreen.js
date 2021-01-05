import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { VictoryPie } from 'victory-native';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import categoriesData from '../data/categoriesData';

const HomeScreen = () => {
  const [viewMode, setViewMode] = useState('chart');
  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMoreToggle, setShowMoreToggle] = useState(false);

  const categoryListHeightAnimationValue = useRef(new Animated.Value(115))
    .current;

  const renderNavBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', width: 50 }}
          onPress={() => console.log('Back')}
        >
          <Image
            source={icons.back_arrow}
            style={{ height: 30, width: 30, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: 50,
            alignItems: 'flex-end',
          }}
          onPress={() => console.log('More')}
        >
          <Image
            source={icons.more}
            style={{ height: 30, width: 30, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
            My Expenses
          </Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.h3 }}>
            Summary (private)
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: COLORS.lightGray,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={icons.calendar}
              style={{ height: 20, width: 20, tintColor: COLORS.lightBlue }}
            />
          </View>

          <View style={{ marginLeft: SIZES.padding }}>
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
              11 Jan, 2020
            </Text>
            <Text style={{ color: COLORS.darkgray, ...FONTS.body3 }}>
              18% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCatergoryHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: SIZES.padding,
        }}
      >
        {/* Title */}
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Categories</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
            {categories.length} Total
          </Text>
        </View>

        {/* Button */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: viewMode == 'chart' ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            onPress={() => setViewMode('chart')}
          >
            <Image
              source={icons.chart}
              style={{
                height: 20,
                width: 20,
                tintColor: viewMode == 'chart' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: viewMode == 'list' ? COLORS.secondary : null,
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: SIZES.base,
            }}
            onPress={() => setViewMode('list')}
          >
            <Image
              source={icons.menu}
              style={{
                height: 20,
                width: 20,
                tintColor: viewMode == 'list' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCategoryList = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => setSelectedCategory(item)}
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 5,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}
        >
          <Image
            source={item.icon}
            style={{ height: 20, width: 20, tintColor: item.color }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.primary,
              ...FONTS.h4,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.base,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToggle(!showMoreToggle);
          }}
        >
          <Text style={{ ...FONTS.body4 }}>
            {showMoreToggle ? 'LESS' : 'MORE'}
          </Text>
          <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={{
              height: 15,
              width: 15,
              alignSelf: 'center',
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderIncomingExpensesTitle = () => {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: COLORS.lightGray,
          padding: SIZES.padding,
        }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
          INCOMING EXPENSES
        </Text>
        <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>12 Total</Text>
      </View>
    );
  };

  const renderIncomingExpenses = () => {
    let allExpenses = selectedCategory ? selectedCategory.expenses : [];
    let incomingExpenses = allExpenses.filter((a) => a.status == 'P');

    const renderItem = ({ item, index }) => (
      <View
        style={{
          width: 300,
          marginRight: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginVertical: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.lightGray,
              marginRight: SIZES.base,
            }}
          >
            <Image
              source={selectedCategory.icon}
              style={{
                height: 30,
                width: 30,
                tintColor: selectedCategory.color,
              }}
            />
          </View>
          <Text style={{ color: selectedCategory.color, ...FONTS.h3 }}>
            {selectedCategory.name}
          </Text>
        </View>

        {/* Expense Description */}
        <View style={{ paddingHorizontal: SIZES.padding }}>
          {/* Title & Description */}
          <Text style={{ ...FONTS.h2 }}>{item.title}</Text>
          <Text
            style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}
          >
            {item.description}
          </Text>

          {/* Location */}
          <Text style={{ marginTop: SIZES.padding, ...FONTS.h4 }}>
            Location
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.pin}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                marginBottom: SIZES.base,
                color: COLORS.darkgray,
                ...FONTS.body4,
              }}
            >
              {item.location}
            </Text>
          </View>
        </View>

        {/* Price */}
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomStartRadius: SIZES.radius,
            borderBottomEndRadius: SIZES.radius,
            backgroundColor: selectedCategory.color,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
            CONFIRM {item.total.toFixed(2)} USD
          </Text>
        </View>
      </View>
    );
    return (
      <View>
        {renderIncomingExpensesTitle()}
        {incomingExpenses.length > 0 && (
          <FlatList
            data={incomingExpenses}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        {incomingExpenses.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}
          >
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
              No Record
            </Text>
          </View>
        )}
      </View>
    );
  };

  const processCategoryDataToDisplay = () => {
    //Filter Expenses with Confirmed status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses.filter((a) => a.status == 'C');
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // Filter out category with no data
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate total expense
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    //Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  };

  const setSelectedCategoryByName = (name) => {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  };

  const renderChart = () => {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <VictoryPie
          data={chartData}
          labels={(datum) => `${datum.y}`}
          radius={({ datum }) =>
            selectedCategory && selectedCategory.name == datum.name
              ? SIZES.width * 0.4
              : SIZES.width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({ innerRadius }) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: { fill: 'white', ...FONTS.body3 },
            parent: { ...styles.shadow },
          }}
          width={SIZES.width * 0.8}
          height={SIZES.width * 0.8}
          colorScale={colorScales}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: (props) => {
                        let categoryName = chartData[props.index].name;
                        setSelectedCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />

        <View style={{ position: 'absolute', top: '40%', left: '40%' }}>
          <Text style={{ textAlign: 'center', ...FONTS.h1 }}>
            {totalExpenseCount}
          </Text>
          <Text style={{ textAlign: 'center', ...FONTS.body3 }}>Expenses</Text>
        </View>
      </View>
    );
  };

  const renderExpenseSummary = () => {
    let data = processCategoryDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectedCategoryByName(categoryName);
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.y} USD - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {/* Nav Bar Section */}
      {renderNavBar()}

      {/* Header Section */}
      {renderHeader()}

      {/* Category Header Section */}
      {renderCatergoryHeader()}

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {viewMode == 'list' && (
          <View>
            {renderCategoryList()}
            {renderIncomingExpenses()}
          </View>
        )}
        {viewMode == 'chart' && (
          <View>
            {renderChart()}
            {renderExpenseSummary()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
