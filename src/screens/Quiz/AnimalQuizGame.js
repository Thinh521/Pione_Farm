import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '~/utils/scaling';
import animalQuizData from '../../data/animalQuizData';
import Background_2 from '../../components/Background/Background_2';

const {width, height} = Dimensions.get('window');

const ConfettiCannon = ({show}) => {
  const confettiAnimation = new Animated.Value(0);

  useEffect(() => {
    if (show) {
      Animated.timing(confettiAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      confettiAnimation.setValue(0);
    }
  }, [show]);

  if (!show) return null;

  return (
    <View style={styles.confettiContainer}>
      {[...Array(20)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.confetti,
            {
              left: Math.random() * width,
              backgroundColor: [
                '#FF6B6B',
                '#4ECDC4',
                '#45B7D1',
                '#96CEB4',
                '#FFEAA7',
              ][Math.floor(Math.random() * 5)],
              transform: [
                {
                  translateY: confettiAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, height],
                  }),
                },
                {
                  rotate: confettiAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

// Wrong Animation Component
const WrongAnimation = ({show}) => {
  const shakeAnimation = new Animated.Value(0);

  useEffect(() => {
    if (show) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View
      style={[
        styles.wrongOverlay,
        {
          transform: [{translateX: shakeAnimation}],
        },
      ]}>
      <Text style={styles.wrongText}>❌</Text>
    </Animated.View>
  );
};

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWrongAnimation, setShowWrongAnimation] = useState(false);

  // Animations
  const questionAnimation = new Animated.Value(0);
  const optionAnimations =
    animalQuizData[currentQuestionIndex]?.options.map(
      () => new Animated.Value(0),
    ) || [];
  const progressAnimation = new Animated.Value(0);

  const question = animalQuizData[currentQuestionIndex];

  useEffect(() => {
    // Animate question entrance
    Animated.timing(questionAnimation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Animate options entrance
    Animated.stagger(
      100,
      optionAnimations.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ),
    ).start();

    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: (currentQuestionIndex + 1) / animalQuizData.length,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswer = option => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);

    const isCorrect = option === question.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnswerFeedback('🎉 Tuyệt vời!');
      setShowConfetti(true);
    } else {
      setAnswerFeedback(`💔 Đáp án đúng là: ${question.correctAnswer}`);
      setShowWrongAnimation(true);
    }

    setTimeout(() => {
      setShowConfetti(false);
      setShowWrongAnimation(false);

      if (currentQuestionIndex + 1 < animalQuizData.length) {
        // Reset animations
        questionAnimation.setValue(0);
        optionAnimations.forEach(anim => anim.setValue(0));

        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswerFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswerFeedback(null);
    questionAnimation.setValue(0);
    optionAnimations.forEach(anim => anim.setValue(0));
    progressAnimation.setValue(0);
  };

  const getScoreColor = () => {
    const percentage = (score / animalQuizData.length) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreEmoji = () => {
    const percentage = (score / animalQuizData.length) * 100;
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '👏';
    return '💪';
  };

  if (showResult) {
    return (
      <>
        <Background_2 />
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.resultContent}>
            <Text style={styles.resultEmoji}>{getScoreEmoji()}</Text>
            <Text style={styles.resultTitle}>Hoàn thành!</Text>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>Điểm số của bạn</Text>
              <Text style={[styles.scoreText, {color: getScoreColor()}]}>
                {score}/{animalQuizData.length}
              </Text>
              <Text style={styles.scorePercentage}>
                {Math.round((score / animalQuizData.length) * 100)}%
              </Text>
            </View>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={restartQuiz}>
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.restartButtonGradient}>
                <Text style={styles.restartButtonText}>🎮 Chơi lại</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Background_2 />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{animalQuizData.length}
          </Text>
        </View>

        {/* Question Card */}
        <Animated.View
          style={[
            styles.questionCard,
            {
              opacity: questionAnimation,
              transform: [
                {
                  translateY: questionAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.questionNumber}>
            Câu hỏi {currentQuestionIndex + 1}
          </Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;

            let optionColors = ['#ffffff', '#f8f9fa'];
            let borderColor = '#e9ecef';
            let textColor = '#343a40';

            if (selectedAnswer) {
              if (isSelected && isCorrect) {
                optionColors = ['#d4edda', '#c3e6cb'];
                borderColor = '#28a745';
                textColor = '#155724';
              } else if (isSelected && !isCorrect) {
                optionColors = ['#f8d7da', '#f5c6cb'];
                borderColor = '#dc3545';
                textColor = '#721c24';
              } else if (isCorrect) {
                optionColors = ['#d4edda', '#c3e6cb'];
                borderColor = '#28a745';
                textColor = '#155724';
              }
            }

            return (
              <Animated.View
                key={index}
                style={[
                  {
                    opacity: optionAnimations[index],
                    transform: [
                      {
                        translateX: optionAnimations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TouchableOpacity
                  style={[styles.optionButton, {borderColor}]}
                  onPress={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}>
                  <LinearGradient
                    colors={optionColors}
                    style={styles.optionGradient}>
                    <View style={styles.optionContent}>
                      <View style={styles.optionIcon}>
                        <Text style={styles.optionLetter}>
                          {String.fromCharCode(65 + index)}
                        </Text>
                      </View>
                      <Text style={[styles.optionText, {color: textColor}]}>
                        {option}
                      </Text>
                      {selectedAnswer && isCorrect && (
                        <Text style={styles.checkMark}>✓</Text>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {answerFeedback && (
          <Animated.View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{answerFeedback}</Text>
          </Animated.View>
        )}

        {/* Effects */}
        <ConfettiCannon show={showConfetti} />
        <WrongAnimation show={showWrongAnimation} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: scale(20),
  },
  progressContainer: {
    marginBottom: scale(30),
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: scale(8),
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  questionCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: scale(24),
    marginBottom: scale(30),
  },
  questionNumber: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginBottom: scale(8),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    lineHeight: 30,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    borderRadius: 16,
    marginBottom: scale(12),
    borderWidth: 2,
    overflow: 'hidden',
  },
  optionGradient: {
    padding: scale(16),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  optionLetter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  checkMark: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: 'bold',
  },
  feedbackContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: scale(16),
    alignItems: 'center',
    marginTop: scale(20),
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
  },
  resultContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: scale(20),
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: scale(30),
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: scale(30),
    alignItems: 'center',
    marginBottom: scale(40),
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: scale(8),
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  scorePercentage: {
    fontSize: 20,
    color: '#888',
    fontWeight: '600',
  },
  restartButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  restartButtonGradient: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(32),
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  wrongOverlay: {
    position: 'absolute',
    top: height * 0.4,
    left: width * 0.4,
    right: width * 0.4,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  wrongText: {
    fontSize: 60,
  },
});

export default QuizScreen;
