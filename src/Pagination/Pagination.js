import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native"; 

export const DOTS = "...";

export const Pagination = (props) => {
    const {
        onPageChange, 
        totalCount, 
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if (currentPage === 0 || paginationRange.length < 1) {
        return null;
    }

    const onNext = () => {
        if (paginationRange.length === 1) {
            return;
        }

        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        if (paginationRange.length === 1) {
            return;
        }

        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return(
        <View style={style.classPageContainer}>
            <Pressable style={style.classPage} onPress={onPrevious}>
                <Text style={style.classPageText}>&lt;</Text>
            </Pressable>

             {paginationRange.map((str, num) => {
                if (str === DOTS) {
                    return (
                        <View key={num} style={style.classPage}>
                            <Text style={style.classPageText}>{DOTS}</Text>
                        </View>
                    )
                }   

                return (
                    <Pressable style={[style.classPage, (str === currentPage) ? style.classPageSelected : null]} key={num} onPress={() => onPageChange(str)}>
                        <Text style={[style.classPageText, (str === currentPage) ? style.classPageTextSelected : null]}>{str}</Text>
                    </Pressable> 
                )
            })}

            <Pressable style={style.classPage} onPress={onNext}>
                <Text style={style.classPageText}>&gt;</Text>
            </Pressable>
        </View>
    )
}

export const usePagination = ({totalCount, pageSize, siblingCount = 1, currentPage}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = leftSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}

const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
}

const style = StyleSheet.create({
    classPageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width * 0.95,
        height: 50,
        // marginTop: 5
    },
    classPage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 43,
        height: 40,
        color: "white",
        // backgroundColor: "white",
    },
    classPageText: {
        color: "white",
        fontWeight: "900"
    },
    classPageSelected: {
        backgroundColor: "black",
        borderRadius: 100
    },
    classPageTextSelected: {
        color: "#e6e488"
    }
})